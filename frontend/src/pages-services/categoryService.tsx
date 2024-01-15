import { httpModule } from "../helpers/HttpModule";
import { ICategory } from "../types/GlobalTypes";

interface CategoryApiRequest {
  name: string;
}

function handleHttpError(error: Error): void {
  if (error instanceof Error) {
    console.log("Error: ", error.message);
  } else {
    console.log("Unexpected error: ", error);
  }
  throw error;
}

export class CategoryService {
  constructor(private categoryEndpoints: {
    LIST: string;
    CREATE: string;
    EDIT: string;
    FIND: string;
    DELETE: string;
  }) {}

  async createCategory(categoryData: CategoryApiRequest) {
    try {
      if (!categoryData || !categoryData.name) {
        throw new Error("Invalid category data");
      }

      const data = {
        name: categoryData.name,
      };

      await httpModule.post(this.categoryEndpoints.CREATE, data);
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async editCategory(id: number, categoryData: CategoryApiRequest) {
    try {
      if (!categoryData || !categoryData.name) {
        throw new Error("Invalid category data");
      }

      const data = {
        CategoryId: id,
        name: categoryData.name,
      };

      await httpModule.put(`${this.categoryEndpoints.EDIT}/${id}`, data);
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async getCategories(filter: any): Promise<any> {
    try {
      let params = [];

      for (const key in filter) {
        params.push(`${key}=${filter[key]}`);
      }

      const response = await httpModule.get(
        `${this.categoryEndpoints.LIST}?${params.join("&")}`
      );

      return response;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async getCategory(id: number): Promise<any> {
    try {
      const response = await httpModule.get(
        `${this.categoryEndpoints.FIND}/${id}`
      );
  
      const category: ICategory = {
        categoryId: response.categoryId,
        name: response.name,
        createdAt: response.createdAt,
      };
  
      return category;
    } catch (error: any) {
      handleHttpError(error);
      return {};
    }
  }

  async deleteCategory(id: number) {
    try {
      await httpModule.delete(
        `${this.categoryEndpoints.DELETE}/${id}`
      );
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}