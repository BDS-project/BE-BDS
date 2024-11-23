export default `
 type Appointment {
    id: ID!
    full_name: String!
    email: String!
    phone: String!
    appointment_date: String!
    property: String!
    status: AppointmentStatus!
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

  input CreateAppointmentInput {
    full_name: String!
    email: String!
    phone: String!
    appointment_date: String!
    property: String!
  }

  input CreateAppointmentInput {
    full_name: String!
    email: String!
    phone: String!
    appointment_date: String!
    property: String!
    customer: String
    advisor: String
  }


  type Query {
    appointments: [Appointment!]!
    appointment(id: ID!): Appointment
    myAppointments: [Appointment!]!
  }

  type Mutation {
    createAppointment(input: CreateAppointmentInput!): Appointment!
    updateAppointmentStatus(id: ID!, status: AppointmentStatus!): Appointment!
    cancelAppointment(id: ID!): Appointment!
  }
`;
