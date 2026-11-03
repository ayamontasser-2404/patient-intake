# API Specification — Smart Patient Intake

**Version:** 1.0  
**Base path:** `/api`  
**Transport:** JSON over HTTP; multipart form-data for document uploads  
**Status:** Proposed MVP contract

## 1. Conventions

- All IDs are UUID strings.
- Dates use ISO 8601. Date of birth uses `YYYY-MM-DD`.
- Timestamps use UTC ISO 8601 strings.
- JSON requests and responses use `application/json`, except uploads.
- Validate all requests on the server using shared Zod schemas.
- Never return local filesystem paths or secrets.
- Do not include patient content in error messages or logs.

## 2. Common response shapes

Success:
```json
{
  "data": {},
  "meta": {
    "requestId": "uuid"
  }
}
```

Error:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid.",
    "details": [
      { "field": "email", "issue": "Invalid email address" }
    ],
    "requestId": "uuid"
  }
}
```

Do not echo sensitive submitted values in validation details.

## 3. Domain enums

`IntakeStatus`:
- `draft`
- `submitted`
- `processing`
- `ready_for_review`
- `processing_failed`
- `needs_correction`
- `approved`

`DocumentProcessingStatus`:
- `uploaded`
- `processing`
- `processed`
- `failed`

`ReportedState`:
- `not_provided`
- `none_reported`
- `reported`

## 4. Intake request/response

### POST `/intakes`
Create and submit an intake.

Request:
```json
{
  "patient": {
    "fullName": "Alex Example",
    "dateOfBirth": "1985-04-12",
    "email": "alex@example.test",
    "phone": null
  },
  "visit": {
    "reasonForVisit": "Fictional example reason",
    "symptoms": ["Fictional symptom"]
  },
  "history": {
    "medicalHistory": [],
    "previousOperations": [],
    "allergies": {
      "state": "reported",
      "items": ["Fictional example allergy"]
    },
    "medications": {
      "state": "not_provided",
      "items": []
    },
    "familyHistory": [],
    "smokingStatus": "not_provided",
    "alcoholUse": "not_provided",
    "additionalNotes": null
  },
  "patientAccuracyConfirmed": true
}
```

Response: `201 Created`
```json
{
  "data": {
    "id": "uuid",
    "status": "submitted",
    "createdAt": "2026-11-03T12:00:00.000Z"
  },
  "meta": { "requestId": "uuid" }
}
```

Validation:
- Full name, DOB, email, reason for visit, and at least one symptom/complaint are required for this demo.
- `patientAccuracyConfirmed` must be true to submit.
- The confirmation is not legal consent to all data processing.
- Enforce reasonable length limits and valid date/email formats.

### GET `/intakes`
List intakes.

Query:
- `status` optional
- `search` optional
- `limit` optional, default 20, max 100
- `cursor` optional

Response includes summary fields only:
```json
{
  "data": [
    {
      "id": "uuid",
      "patientName": "Alex Example",
      "reasonForVisit": "Fictional example reason",
      "status": "ready_for_review",
      "createdAt": "2026-11-03T12:00:00.000Z"
    }
  ],
  "meta": { "requestId": "uuid", "nextCursor": null }
}
```

### GET `/intakes/:id`
Get intake details, documents metadata, and summary if available. Do not return raw local paths.

### POST `/intakes/:id/process`
Start OCR and summary generation for an existing submitted or retryable failed intake.

Response: `202 Accepted`
```json
{
  "data": {
    "intakeId": "uuid",
    "status": "processing"
  },
  "meta": { "requestId": "uuid" }
}
```

For the local MVP this may run synchronously behind the request or use a lightweight background task, but the API contract should return processing state consistently. Avoid unbounded long-running HTTP requests.

## 5. Document API

### POST `/intakes/:id/documents`
Content type: `multipart/form-data`

Fields:
- `file`: one PDF, JPG, JPEG, or PNG.

Response: `201 Created`
```json
{
  "data": {
    "id": "uuid",
    "intakeId": "uuid",
    "originalName": "fictional-referral.pdf",
    "mimeType": "application/pdf",
    "sizeBytes": 12345,
    "processingStatus": "uploaded"
  },
  "meta": { "requestId": "uuid" }
}
```

Validation:
- Enforce configured max file size and max PDF page count.
- Verify file signature/content, not only extension or client MIME.
- Use a server-generated storage key.
- Store outside public static paths.
- Reject unsupported files with `415 UNSUPPORTED_MEDIA_TYPE`.
- Reject oversized files with `413 FILE_TOO_LARGE`.

### GET `/intakes/:id/documents/:documentId`
Return metadata and processing status. Raw file access is not part of the initial public API. If a preview endpoint is later added, it must be access-controlled and must not expose arbitrary filesystem paths.

## 6. Summary API

### GET `/intakes/:id/summary`
Return the validated structured summary, generation status, and source references.

### PATCH `/intakes/:id/summary`
Update the staff-edited summary.

Request:
```json
{
  "summary": {
    "reasonForVisit": {
      "value": "Fictional example reason",
      "sources": [
        {
          "sourceType": "patient_form",
          "field": "visit.reasonForVisit"
        }
      ]
    },
    "symptoms": [],
    "medicalHistory": [],
    "previousOperations": [],
    "allergies": [],
    "medications": [],
    "missingInformation": []
  }
}
```

The actual shared schema is authoritative. The example is illustrative.

Response: `200 OK` with updated summary and status `ready_for_review`. Editing an approved summary must invalidate approval and require re-review.

## 7. Review API

### POST `/intakes/:id/approve`
Request:
```json
{
  "reviewerLabel": "Demo clinician",
  "note": "Reviewed against the submitted source information."
}
```

Response: `200 OK`, status `approved`, with `approvedAt`.

### POST `/intakes/:id/return`
Request:
```json
{
  "reviewerLabel": "Demo clinician",
  "note": "Please clarify the medication dosage."
}
```

Response: `200 OK`, status `needs_correction`.

`reviewerLabel` is a demo-mode label, not authentication. Do not present it as a verified identity.

## 8. Health endpoint

### GET `/health`
Returns service liveness only:
```json
{
  "data": {
    "status": "ok"
  }
}
```

Do not expose environment variables, dependency credentials, or detailed infrastructure information.

## 9. HTTP status codes

- `200` successful read/update/action
- `201` created
- `202` accepted for processing
- `400` malformed request
- `404` resource not found
- `409` invalid workflow state / conflict
- `413` file too large
- `415` unsupported media type
- `422` schema or semantic validation error
- `500` unexpected server error
- `503` configured external provider unavailable

## 10. Error codes

- `VALIDATION_ERROR`
- `INTAKE_NOT_FOUND`
- `DOCUMENT_NOT_FOUND`
- `UNSUPPORTED_MEDIA_TYPE`
- `FILE_TOO_LARGE`
- `PDF_PAGE_LIMIT_EXCEEDED`
- `OCR_FAILED`
- `AI_PROVIDER_UNAVAILABLE`
- `AI_OUTPUT_INVALID`
- `INVALID_STATUS_TRANSITION`
- `SUMMARY_NOT_FOUND`
- `INTERNAL_ERROR`

## 11. API safety requirements

- Apply request body size limits.
- Validate all route params and query parameters.
- Validate uploads and store them privately.
- Never expose filesystem paths.
- Do not log payloads, OCR text, AI prompts, summaries, or secrets.
- Treat OCR and AI output as untrusted.
- Preserve original intake and document extraction records.
- Demo-mode API is not authenticated and must only run locally with synthetic data.
