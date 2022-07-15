import Subjects from '../_Subjects';
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        owner: string;
    };
}
export default TicketCreatedEvent;
