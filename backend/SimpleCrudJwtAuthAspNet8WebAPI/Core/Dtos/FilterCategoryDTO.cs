using System.ComponentModel.DataAnnotations;
using SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos;

namespace SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos;

public class FilterCategoryDTO
{
    public int CategoryId { get; set; }
    public string? Name { get; set; }
}
