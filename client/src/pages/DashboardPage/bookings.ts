import { Booking } from './types'

const bookings: Booking[] = [
  {
    _id: '691337',
    clinicId: '12',
    reason: 'my teeth hurts :<',
    date: '2022-12-08',
    issuance: '',
    state: 'pending',
    start: '16:00',
    end: '16:30',
    user: {
      name: 'Ivan Vidackovic',
      email: 'plepis.jaunais@gmail.com'
    }
  },
  {
    _id: '133769',
    clinicId: '11',
    reason:
      'my teeth are perfectly fine. I just want to come for an appointment :<',
    date: '2022-12-09',
    issuance: '',
    state: 'pending',
    start: '16:30',
    end: '17:00',
    user: {
      name: 'Ansis Plepis',
      email: 'plepis.jaunais@gmail.com'
    }
  },
  {
    _id: 'swag69',
    clinicId: '1',
    reason:
      'i am a sigmoid and I am making an appointment to fix the dentists teeth',
    date: '2023-01-01',
    issuance: '',
    state: 'pending',
    start: '8:30',
    end: '9:00',
    user: {
      name: 'Georg Zsolnai',
      email: 'plepis.jaunais@gmail.com'
    }
  },
  {
    _id: 'portland_random69',
    clinicId: '10',
    reason:
      'i honestly dont know how i got here. i think im from the multiverse',
    date: '2022-12-04',
    issuance: '',
    state: 'pending',
    start: '15:00',
    end: '15:30',
    user: {
      name: 'Bardia Forooraghi',
      email: 'plepis.jaunais@gmail.com'
    }
  },
  {
    _id: '1337_portland',
    clinicId: '5',
    reason:
      'This is the most generic dentist appointment. Idk why I appointed it on christmas tho',
    date: '2022-12-24',
    issuance: '',
    state: 'pending',
    start: '14:30',
    end: '15:00',
    user: {
      name: 'Mr. Bean',
      email: 'plepis.jaunais@gmail.com'
    }
  }
]

export default bookings
