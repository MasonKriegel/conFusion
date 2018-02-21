export class Feedback {
  firstname: string;
  lastname: string;
  telnum: number;
  email: string;
  agree: boolean;
  contacttype: string;
  message: string;
};

export const ContactType = ['None', 'Tel', 'Email'];

export class DishFeedback {
  author: string;
  rating: number;
  comment: string;
}
