using System;
using System.Collections.Generic;
using System.Text.Json;
using Api.Errors;
using Api.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Api.Services
{
    public class ServiceBase
    {
        private readonly IMapper _mapper;
        private readonly ErrorLocalizer _errorLocalizer;
        public ServiceBase(IMapper mapper, ErrorLocalizer errorLocalizer)
        {
            _errorLocalizer = errorLocalizer;
            _mapper = mapper;
        }

        public T Map<T>(object obj)
        {
            return _mapper.Map<T>(obj);
        }

        public D Map<S, D>(S source, D destination)
        {
            return _mapper.Map<S, D>(source, destination);
        }
        public ApiException ReturnError(Exception exception)
        {
            return new ApiException("400", exception.Message, exception.StackTrace);
        }

        public ApiException ReturnError(IEnumerable<IdentityError> exception)
        {
            return new ApiException("IdentityErrors", JsonSerializer.Serialize(exception));
        }

        public ApiException ReturnError(string messageCode)
        {
            var messageLocalizer = _errorLocalizer[messageCode];

            return new ApiException(messageCode, messageLocalizer);
        }

        public ServiceResult<T> ReturnOk<T>(T value)
        {
            return new ServiceResult<T>(value);
        }
    }
}