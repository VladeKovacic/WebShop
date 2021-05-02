using Api.Errors;

namespace Api.Helpers
{
    public class ServiceResult<T>
    {
        public T Result { get; }
        public bool HasError { get; } = false;
        public ApiException Exception { get; }

        private ServiceResult(ApiException exception) 
        {
            HasError = true;
            Exception = exception;
        }

        public ServiceResult(T result)
        {
            Result = result;
        }

        public static implicit operator ServiceResult<T>(ApiException exception){
            return new ServiceResult<T>(exception);
        }
    }
}