namespace Api.Helpers
{
    public class ServiceError
    {
        public string ErrorMessage { get; }
        public ServiceError(string errorMessage)
        {
            this.ErrorMessage = errorMessage;
        }
    }
}