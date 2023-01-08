export class Page<T> {
  constructor(private readonly _items: T[], private readonly _paging: Paging) {}

  get items() {
    return this._items;
  }

  get paging() {
    return this._paging;
  }
}

export class Paging {
  constructor(
    private readonly _pageSize: number,
    private readonly _pageNumber: number,
  ) {}

  get pageSize() {
    return this._pageSize;
  }

  get pageNumber() {
    return this._pageNumber;
  }
}
