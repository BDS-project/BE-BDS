export default `
 type Appointment {
    id: ID!
    full_name: String
    email: String
    phone: String
    appointment_date: String
    property: String
    status: AppointmentStatus
    customer: User
    advisor: User
    created_at: String
    updated_at: String
  }

  enum AppointmentStatus {
    pending
    confirmed  
    cancelled
  }

type User {
  id: ID!
  avatar: String
  first_name: String
  last_name: String
  email: String
  role: String
  status: String
  created_at: String
  updated_at: String
}

  input CreateAppointmentInput {
    full_name: String!
    email: String!
    phone: String!
    appointment_date: String!
    property: String!
  }

  input UpdateAppointmentInput {
    full_name: String
    email: String
    phone: String
    appointment_date: String
    property: String
    customer: String
    advisor: String
    status: AppointmentStatus
  }

input AppointmentFilterInput {
  full_name: String
  phone: String
  email: String
  appointment_date: String
  property: String
  status: AppointmentStatus
  advisor: ID
  created_at: String
  start_date: String
  end_date: String
  page: Int 
  limit: Int
}

  type Query {
    appointments(filter: AppointmentFilterInput): [Appointment!]!
    appointment(id: ID!): Appointment
    myAppointments: [Appointment!]!
  }

  type Mutation {
    createAppointment(input: CreateAppointmentInput!): Appointment!
    updateAppointment(id: ID!, input: UpdateAppointmentInput!): Appointment!
  }
`;
