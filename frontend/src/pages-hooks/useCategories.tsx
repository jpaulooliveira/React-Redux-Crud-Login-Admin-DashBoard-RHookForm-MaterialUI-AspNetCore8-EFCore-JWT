import { SetStateAction, useEffect, useState } from "react";
import { CategoryService } from "../pages-services/categoryService";
import { ICategory } from "../types/GlobalTypes";
import endpoints from "../helpers/Endpoints";
import { useModalDelete } from "../pages-utils/useModalDelete";

const categoryService = new CategoryService(
   endpoints.CATEGORY.v1
);

export const categoryRepository = (): any => {
   
   const createCategory = async (data: any) => {
      try {
         await categoryService.createCategory(data);
      } catch (error) {
         console.error(error);
      }
   };

   const editCategory = async (id: number, data: any) => {
      try {
         await categoryService.editCategory(id, data);
      } catch (error) {
         console.error(error);
      }
   };
  
    const getCategory = async (id: number) => {
       try {
          const result = await categoryService.getCategory(id);
          return result;
       } catch (error) {
          console.error(error);
       }
    };

    const getCategories = async (filter: any) => {
      try {
         const result = await categoryService.getCategories(filter);
         return result;
      } catch (error) {
         console.error(error);
      }
   };
 
   return { editCategory, createCategory, getCategory, getCategories };
 };

export const useCategory = (id: number): any => {
   const [category, setCategory] = useState<ICategory>();

   const { getCategory } = categoryRepository();
    
   useEffect(() => {
      getCategory(id)
         .then((category: SetStateAction<ICategory | undefined>) => setCategory(category))
         .catch((error: any) => console.error(error));
   }, []);
 
   return { category, setCategory };
 };

export const useCategories = (defaultValues: any) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { id, setID, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal } = useModalDelete();
  const { getCategories } = categoryRepository();

   useEffect(() => {
      getCategories(defaultValues)
         .then((categories: SetStateAction<ICategory[]>) => setCategories(categories))
         .catch((error: any) => console.error(error));
   }, []);

   const handleDelete = async () => {
      try {         
         await categoryService.deleteCategory(Number(id));
         handleCloseDeleteModal();
         setCategories(categories.filter(c=>c.categoryId != id)); // NEEDS TO REFRESH THE GRID        
      } catch (error) {
         console.error(error);
      }
   };

   const handleFilter = async (filter: any) => {
      try {
         const filteredCategories = await getCategories(filter);
         setCategories(filteredCategories);
      } catch (error) {
         console.error(error);
      }
   };

  return { categories, setCategories, handleDelete, handleFilter, setID, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal };
};


