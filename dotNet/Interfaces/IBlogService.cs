using Sabio.Models;
using Sabio.Models.Domain.Blogs;
using Sabio.Models.Requests.Blogs;

namespace Sabio.Services.Interfaces
{
    public interface IBlogService
    {
        int Add(BlogAddRequest model, int userId);
        void Delete(BlogUpdateRequest model);
        Blog Get(int id);
        Paged<Blog> GetAll(int pageIndex, int pageSize);
        Paged<Blog> GetByBlogType(int pageIndex, int pageSize, int blogTypeId);
        Paged<Blog> GetByCreatedBy(int pageIndex, int pageSize, string query);
        Paged<Blog> SearchPagination(int pageIndex, int pageSize, string query);
        void Update(BlogUpdateRequest model, int userId);
    }
}