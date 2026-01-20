# API Documentation

## POST /external/search

Search for entities (people, jobs, etc.) using the external Torre API.

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | **Yes** | The search term or name to look for. |
| `identityType` | `string` | **Yes** | The type of entity to search for (e.g., `person`, `organization`). |
| `limit` | `number` | No | Maximum number of results to return. |
| `meta` | `boolean` | No | Whether to include metadata in the response. |
| `excludeContacts` | `boolean` | No | Whether to exclude contacts from the search results. |

#### Example Request

```json
{
  "query": "Renan Peixoto",
  "identityType": "person",
  "limit": 10,
  "meta": true,
  "excludeContacts": true
}
```

### Response

The response is wrapped in a standard `ApiResponse` structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `statusCode` | `number` | HTTP status code (e.g., 200). |
| `data` | `object[]` | Array of search result objects. |
| `timestamp` | `string` | ISO 8601 timestamp of the response. |

#### Data Object Structure

| Field | Type | Description |
| :--- | :--- | :--- |
| `ardaId` | `number` | Unique numeric identifier. |
| `ggId` | `string` | Global identifier string. |
| `name` | `string` | Display name of the entity. |
| `comparableName` | `string` | Normalized name for comparison. |
| `username` | `string` | Username handle. |
| `professionalHeadline` | `string` | Professional headline/title. |
| `imageUrl` | `string` | URL to the profile image. |
| `completion` | `number` | Profile completion score (0-1). |
| `grammar` | `number` | Grammar score. |
| `weight` | `number` | Relevance weight. |
| `verified` | `boolean` | Verification status. |
| `connections` | `array` | List of connections (if available). |
| `totalStrength` | `number` | Total profile strength. |
| `pageRank` | `number` | Page rank score. |
| `organizationId` | `number` \| `null` | Associated organization ID. |
| `organizationNumericId` | `number` \| `null` | Associated numeric organization ID. |
| `publicId` | `string` \| `null` | Public identifier. |
| `status` | `string` \| `null` | Entity status. |
| `creators` | `array` | List of creators. |
| `relationDegree` | `number` | Degree of connection. |
| `isSearchable` | `boolean` | Whether the entity is searchable. |
| `contact` | `boolean` | Whether the entity is a contact. |

#### Example Response

```json
{
  "statusCode": 200,
  "data": [
    {
      "ardaId": 84513836,
      "ggId": "14714",
      "name": "Renan Peixoto",
      "comparableName": "renan peixoto",
      "username": "renanpeixotox",
      "professionalHeadline": "Head of Engineering at Torre",
      "imageUrl": "https://res.cloudinary.com/torre-technologies-co/image/upload/c_fill,h_150,w_150/v1715315358/origin/starrgate/users/profile_0186a3f6b0c10604a744085ae82dbbe2525b692a.jpg",
      "completion": 1,
      "grammar": 0.79918,
      "weight": 3244.3951,
      "verified": true,
      "connections": [],
      "totalStrength": 0,
      "pageRank": 246.12956573134284,
      "organizationId": null,
      "organizationNumericId": null,
      "publicId": null,
      "status": null,
      "creators": [],
      "relationDegree": 1,
      "isSearchable": true,
      "contact": false
    }
  ],
  "timestamp": "2026-01-20T19:54:34.890Z"
}
```

## GET /external/bios/:username

Retrieve the genome information (bio) for a specific user.

### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Yes** | The username of the person to fetch the bio for. |

### Response

The response is wrapped in a standard `ApiResponse` structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `statusCode` | `number` | HTTP status code (e.g., 200). |
| `data` | `object` | The bio data object. |
| `timestamp` | `string` | ISO 8601 timestamp of the response. |

#### Data Object Structure

Key top-level fields within `data`:

| Field | Type | Description |
| :--- | :--- | :--- |
| `person` | `object` | Personal information including name, headline, location, and summary. |
| `stats` | `object` | Statistical data, e.g., strengths count. |
| `strengths` | `object[]` | List of strengths/skills with proficiency levels. |
| `interests` | `object[]` | List of interests. |
| `experiences` | `object[]` | Work and educational experiences. |
| `jobs` | `object[]` | Job listings. |
| `languages` | `object[]` | Languages spoken and proficiency. |

#### Example Response

```json
{
  "statusCode": 200,
  "data": {
    "person": {
      "professionalHeadline": "Head of Engineering",
      "completion": 0.6667,
      "showPhone": false,
      "created": "2023-11-06T20:45:03Z",
      "verified": true,
      "flags": {
        "accessCohort": false,
        "benefits": false,
        // ... (other flags)
        "genomeIndexed": false
      },
      "weight": 0,
      "ggId": "a6822ae8bb6640ccb002fb8e73dc6fde",
      "completionStage": {
        "stage": 1,
        "progress": 0.7778
      },
      "locale": "en",
      "subjectId": 1619448,
      "hasEmail": true,
      "isTest": false,
      "name": "Renan Peixoto da Silva",
      "links": [],
      "location": {
        "name": "San Francisco, California, United States",
        "shortName": "San Francisco, California, United States",
        "country": "United States",
        "countryCode": "US",
        "latitude": 37.7749295,
        "longitude": -122.4194155,
        "timezone": "America/Los_Angeles",
        "placeId": "ChIJIQBpAG2ahYAR_6128GcTUEo"
      },
      "theme": "lime500",
      "id": "ZNObv70y",
      "claimant": false,
      "summaryOfBio": "I'm a software engineering manager...",
      "publicId": "renan-at-torre"
    },
    "stats": {
      "strengths": 56
    },
    "strengths": [
      {
        "id": "MgJZ8K4N",
        "code": 6080695,
        "name": "Curriculum development",
        "proficiency": "proficient",
        "implicitProficiency": false,
        "weight": 0,
        "recommendations": 0,
        "media": [],
        "supra": false,
        "created": "2024-09-19T18:19:33",
        "hits": 8397,
        "relatedExperiences": [],
        "pin": true
      },
      // ... (other strengths)
      {
        "id": "MB52QlAN",
        "code": 59725,
        "name": "Project management",
        "proficiency": "proficient",
        "implicitProficiency": false,
        "weight": 0,
        "recommendations": 0,
        "media": [],
        "supra": false,
        "created": "2024-09-19T18:19:33",
        "hits": 352387,
        "relatedExperiences": [],
        "pin": true
      }
    ],
    "interests": [],
    "experiences": [],
    "awards": [],
    "jobs": [],
    "projects": [],
    "publications": [],
    "education": [],
    "opportunities": [],
    "preferences": {
      "jobsFullTime": {
        "active": false,
        "private": false,
        "additionalCompensation": {
          "commissions": false,
          "equity": false
        }
      },
      "flexibleJobs": {
        "active": false,
        "private": false,
        "additionalCompensation": {
          "commissions": false,
          "equity": false
        }
      },
      "internships": {
        "active": true,
        "private": true,
        "desirableCompensation": {
          "amount": 500,
          "currency": "USD",
          "periodicity": "monthly",
          "implicit": true
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "language": "English",
        "fluency": "fully-fluent"
      },
      {
        "code": "pt",
        "language": "Portuguese",
        "fluency": "fully-fluent"
      },
      {
        "code": "es",
        "language": "Spanish",
        "fluency": "reading"
      }
    ]
  },
  "timestamp": "2026-01-20T20:02:29.266Z"
}
```
