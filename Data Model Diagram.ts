# Data Model Diagram

`
PowDocument
 ├── version
 ├── project
 │     ├── id
 │     └── name
 ├── contributors[]
 │     ├── id
 │     └── name
 ├── contributions[]
 │     ├── id
 │     ├── contributor (ref → contributors.id)
 │     ├── category
 │     ├── description
 │     └── evidence[]
 │            ├── type
 │            ├── uri
 │            └── hash?
 └── metadata
        ├── created_at
        └── updated_at
`

Description:  
A hierarchical view of the entire protocol data model.

---
