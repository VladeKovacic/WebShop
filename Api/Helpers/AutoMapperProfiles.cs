using System.Linq;
using Api.Dtos;
using Api.Entities;
using AutoMapper;

namespace Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<ProductGroup, ProductGroupDto>();
            CreateMap<ProductGroupDto, ProductGroup>();
            CreateMap<ProductGroupCreateDto, ProductGroup>();
            CreateMap<ProductGroup, ProductGroupTreeDto>();
        }
    }
}