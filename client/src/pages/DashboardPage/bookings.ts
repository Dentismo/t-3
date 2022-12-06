import { Booking } from './types'

const bookings: Booking[] = [
  {
    _id: '638f6183d6ff52a8aa97f1a5',
    user: {
      email: 'plepis.jaunais@gmail.com',
      name: 'Ansis'
    },
    details: 'MongoDB test',
    issuance: '124124',
    clinicId: '1241241241241241',
    clinicName: "Georg's Clinic",
    date: '2022-12-28',
    start: '15:30',
    end: '16:00',
    state: 'pending'
  },
  {
    _id: '638e2b15ac41f60264a9eefc',
    user: {
      email: 'Ansis@gmail.com',
      name: 'Ansis'
    },
    details: 'idek how i got here',
    issuance: '124124',
    clinicId: '1241241241241241',
    clinicName: "Georg's Clinic",
    date: '2022-12-28',
    start: '15:30',
    end: '16:00',
    state: 'pending'
  },
  {
    _id: '2',
    user: {
      email: 'georg@gmail.com',
      name: 'Georg Zsolnai'
    },
    details: 'I however *do* know how I got here',
    issuance: '4242',
    clinicId: '1241241241241241',
    clinicName: "Georg's Clinic",
    date: '2022-12-29',
    start: '16:30',
    end: '17:00',
    state: 'pending'
  },
  {
    _id: '3',
    user: {
      name: 'Ansis Plepis',
      email: 'plepis.jaunais@gmail.com'
    },
    details:
      'my teeth are perfectly fine. I just want to come for an appointment :<',
    issuance: '',
    clinicId: '1338',
    clinicName: "Ivan's Clinic",
    date: '2022-12-09',
    start: '16:30',
    end: '17:00',
    state: 'pending'
  },
  {
    _id: 'swag69',
    user: {
      name: 'Georg Zsolnai',
      email: 'plepis.jaunais@gmail.com'
    },
    details:
      'i am a sigmoid and I am making an appointment to fix the dentists teeth',
    issuance: '',
    clinicId: '3',
    clinicName: "Bardia's Clinic",
    date: '2023-01-01',
    start: '8:30',
    end: '9:00',
    state: 'pending'
  },
  {
    _id: 'portland_random69',
    user: {
      name: 'Bardia Forooraghi',
      email: 'plepis.jaunais@gmail.com'
    },
    details:
      'i honestly dont know how i got here. i think im from the multiverse',
    issuance: '',
    clinicId: '4',
    clinicName: "Carl's Clinic",
    date: '2022-12-04',
    start: '15:00',
    end: '15:30',
    state: 'pending'
  },
  {
    _id: '1337_portland',
    user: {
      name: 'Mr. Bean',
      email: 'plepis.jaunais@gmail.com'
    },
    details:
      'This is the most generic dentist appointment. Idk why I appointed it on christmas tho',
    issuance: '',
    clinicId: '5',
    clinicName: "John's Clinic",
    date: '2022-12-24',
    start: '14:30',
    end: '15:00',
    state: 'pending'
  }
]

export default bookings
