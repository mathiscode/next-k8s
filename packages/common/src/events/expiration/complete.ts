import Subjects from '../_Subjects'

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: { orderId: string; }
}

export default ExpirationCompleteEvent
