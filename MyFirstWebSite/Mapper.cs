using AutoMapper;
using DTO;
using Entities;

namespace MyWebsite
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<UserWithPasswordDTO, User>();

            CreateMap<User, UserWithoutPasswordDTO > ();

            CreateMap<Product, ProductDTO>().ReverseMap();

            CreateMap<Category, CategoryDTO>().ReverseMap();

            CreateMap<Order, OrderDTO>().ReverseMap();

            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();

        }

    }
}
