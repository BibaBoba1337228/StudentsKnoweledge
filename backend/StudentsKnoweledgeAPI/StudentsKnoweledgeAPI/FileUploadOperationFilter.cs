﻿

namespace StudentsKnoweledgeAPI
{
    using Microsoft.OpenApi.Models;
    using Swashbuckle.AspNetCore.SwaggerGen;
    using System.Linq;

    public class FileUploadOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.OperationId == null)
                return;

            // Найти действия с параметром IFormFile
            var parameters = context.MethodInfo.GetParameters()
                .Where(p => p.ParameterType == typeof(IFormFile) ||
                            p.ParameterType == typeof(IEnumerable<IFormFile>));

            if (parameters.Any())
            {
                operation.RequestBody = new OpenApiRequestBody
                {
                    Content = new Dictionary<string, OpenApiMediaType>
                    {
                        ["multipart/form-data"] = new OpenApiMediaType
                        {
                            Schema = new OpenApiSchema
                            {
                                Type = "object",
                                Properties = new Dictionary<string, OpenApiSchema>
                            {
                                { "materialId", new OpenApiSchema { Type = "integer", Format = "int32" } },
                                { "studentId", new OpenApiSchema { Type = "string" } },
                                { "file", new OpenApiSchema { Type = "string", Format = "binary" } }
                            },
                                Required = new HashSet<string> { "materialId", "studentId", "file" }
                            }
                        }
                    }
                };
            }
        }
    }


}