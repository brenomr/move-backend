export class PaginationDTO {
  page: number = 1; // Página atual
  limit: number = 10; // Itens por página == page size
  orderBy: string;
  order: string = 'ASC';
}