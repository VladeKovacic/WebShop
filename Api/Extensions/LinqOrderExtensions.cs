using System.Linq;
using System.Linq.Expressions;
using Api.Helpers;

namespace Api.Extensions
{
    public static class LinqOrderExtensions
    {
        public static IOrderedQueryable<T> Order<T>(this IQueryable<T> source, string propertyName, string descending, bool anotherLevel = false)
        {
            var param = Expression.Parameter(typeof(T), string.Empty);
            var property = Expression.PropertyOrField(param, propertyName);
            var sort = Expression.Lambda(property, param);

            var call = Expression.Call(
                typeof(Queryable),
                (!anotherLevel ? "OrderBy" : "ThenBy") +
                (descending == "desc" ? "Descending" : string.Empty),
                new[] { typeof(T), property.Type },
                source.Expression,
                Expression.Quote(sort));

            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(call);
        }
    }
}