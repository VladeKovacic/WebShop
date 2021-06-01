namespace Api.Helpers
{
    public class ProductParams : PaginationParams
    {
        public string SearchString { get; set; }
        public string SortDirection { get; set; }
        public string SortColumn { get; set; }
    }
}