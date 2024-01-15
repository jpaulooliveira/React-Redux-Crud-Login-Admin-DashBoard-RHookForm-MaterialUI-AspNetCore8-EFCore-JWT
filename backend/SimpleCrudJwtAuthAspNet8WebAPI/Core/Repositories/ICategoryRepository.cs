

using SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos;
using SimpleCrudJwtAuthAspNet8WebAPI.Core.Entities;

namespace SimpleCrudJwtAuthAspNet8WebAPI.Core.Repositories;

public interface ICategoryRepository 
{
    Task<IEnumerable<Category>> GetAll(FilterCategoryDTO filter);
    Task<IEnumerable<Category>> GetCategoriesProducts();
    Task<Category> GetById(int id);
    Task<Category> Create(Category category);
    Task<Category> Update(Category category);
    Task<Category> Delete(int id);
}
