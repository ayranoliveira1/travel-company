"use client";

import { Controller, useForm } from "react-hook-form";
import Button from "./components/Button";
import CurrencyInput from "./components/CurrencyInput";
import DatePicker from "./components/DatePicker";
import Input from "./components/input";
import { useRouter } from "next/navigation";

interface SearchForm {
   text: string;
   startDate: Date | null;
   budget: string;
}

const Search = () => {
   const router = useRouter();

   const {
      control,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SearchForm>();

   const onSubmit = (data: SearchForm) => {
      router.push(
         `/trips/search?text=${
            data.text
         }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`
      );
   };

   return (
      <div className="container mx-auto p-4 bg-search-background bg-cover bg-center bg-no-repeat">
         <h1 className="font-semibold text-xl text-secondary text-center">
            Encontre sua proxima <span className="text-primary">viagem!</span>
         </h1>

         <div className="flex flex-col gap-4 mt-5">
            <Input
               placeholder="Onde você quer ir?"
               error={!!errors.text}
               errorMessage={errors.text?.message}
               {...register("text", {
                  required: {
                     value: true,
                     message: "O campo de busca é obrigatório",
                  },
               })}
            />

            <div className="flex gap-4">
               <Controller
                  name="startDate"
                  render={({ field }) => (
                     <DatePicker
                        placeholderText="Data de início"
                        onChange={field.onChange}
                        selected={field.value}
                        className="w-full"
                        minDate={new Date()}
                     />
                  )}
                  control={control}
               />

               <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                     <CurrencyInput
                        allowDecimals={false}
                        placeholder="Orçamento"
                        onValueChange={field.onChange as any}
                        value={field.value}
                        onBlur={field.onBlur}
                     />
                  )}
               />
            </div>

            <Button
               onClick={() => {
                  handleSubmit(onSubmit)();
               }}
            >
               Buscar
            </Button>
         </div>
      </div>
   );
};

export default Search;
