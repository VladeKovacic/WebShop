namespace Api.Errors
{
    public class ApiException
    {
        public ApiException(string exceptionCode, string message = null, string details = null)
        {
            ExceptionCode = exceptionCode;
            Message = message;
            Details = details;
        }

        public string ExceptionCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}