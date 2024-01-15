﻿using SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos;
using SimpleCrudJwtAuthAspNet8WebAPI.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace SimpleCrudJwtAuthAspNet8WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> Get([FromQuery] FilterCategoryDTO filter)

    {

        var categoriesDto = await _categoryService.GetCategories(filter);

        if (categoriesDto is null)
            return NotFound("Categories not found");

        return Ok(categoriesDto);
    }

    [HttpGet("products")]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategoriasProducts()
    {
        var categoriesDto = await _categoryService.GetCategoriesProducts();
        if (categoriesDto == null)
        {
            return NotFound("Categories not found");
        }
        return Ok(categoriesDto);
    }

    [HttpGet("{id:int}", Name = "GetCategory")]
    public async Task<ActionResult<CategoryDTO>> Get(int id)
    {
        var categoryDto = await _categoryService.GetCategoryById(id);
        if (categoryDto == null)
        {
            return NotFound("Category not found");
        }
        return Ok(categoryDto);
    }
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CategoryDTO categoryDto)
    {
        Console.Write("ABC");
        Console.Write(categoryDto);
        if (categoryDto == null)
            return BadRequest("Invalid Data");

        await _categoryService.AddCategory(categoryDto);

        return new CreatedAtRouteResult("GetCategory", new { id = categoryDto.CategoryId },
            categoryDto);
    }


    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, [FromBody] CategoryDTO categoryDto)
    {
        if (id != categoryDto.CategoryId)
            return Ok(categoryDto);

        if (categoryDto is null)
            return Ok(10);

        await _categoryService.UpdateCategory(categoryDto);

        return Ok(categoryDto);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<CategoryDTO>> Delete(int id)
    {
        var categoryDto = await _categoryService.GetCategoryById(id);
        if (categoryDto == null)
        {
            return NotFound("Category not found");
        }

        await _categoryService.RemoveCategory(id);

        return Ok(categoryDto);
    }
}
