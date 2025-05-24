export interface IExpensesGet {
  _id: string;
  title: string;
  amount: number;
  category: string;
  note: string;
}

export interface IExpensesPost {
  title: string;
  amount: number;
  category: string;
  note: string;
}
