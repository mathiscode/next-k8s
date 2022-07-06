import Subjects from '../_Subjects';
export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: {
        id: string;
        title: string;
        price: number;
        owner: string;
    };
}
export default TicketUpdatedEvent;
