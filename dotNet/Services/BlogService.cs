using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Blogs;
using Sabio.Models.Requests.Blogs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class BlogService : IBlogService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        public BlogService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }
        public int Add(BlogAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Blogs_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@BlogTypeId", model.BlogTypeId);
                col.AddWithValue("@AuthorId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

                Console.WriteLine("");
            });
            return id;
        }
        public void Delete(BlogUpdateRequest model)
        {
            string procName = "[dbo].[Blogs_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                //col.AddWithValue("@IsDeleted", model.IsDeleted);
            },
            returnParameters: null);
        }
        public Blog Get(int id)
        {
            string procName = "[dbo].[Blogs_Select_ById]";

            Blog blog = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            },
            delegate (IDataReader reader, short set)
            {
                int index = 0;
                blog = MapSingleBlog(reader, ref index);
            }
            );

            return blog;
        }
        public Paged<Blog> GetAll(int pageIndex, int pageSize)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("dbo.Blogs_SelectAll",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);

                },

                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    Blog blog = MapSingleBlog(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }

                    if (list == null)
                    {
                        list = new List<Blog>();
                    }

                    list.Add(blog);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Blog> GetByBlogType(int pageIndex, int pageSize, int blogTypeId)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("dbo.Blogs_Select_ByBlogTypeId",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@BlogTypeId", blogTypeId);
                },

                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    Blog blog = MapSingleBlog(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }

                    if (list == null)
                    {
                        list = new List<Blog>();
                    }

                    list.Add(blog);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Blog> GetByCreatedBy(int pageIndex, int pageSize, string query)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("dbo.Blogs_Select_ByCreatedBy",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },

                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    Blog blog = MapSingleBlog(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }

                    if (list == null)
                    {
                        list = new List<Blog>();
                    }

                    list.Add(blog);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Blog> SearchPagination(int pageIndex, int pageSize, string query)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("dbo.Blogs_Search",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },

                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    Blog blog = MapSingleBlog(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }

                    if (list == null)
                    {
                        list = new List<Blog>();
                    }

                    list.Add(blog);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void Update(BlogUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Blogs_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@BlogTypeId", model.BlogTypeId);
                col.AddWithValue("@AuthorId", userId);
            },
            returnParameters: null);
        }
        private static void AddCommonParams(BlogAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@Content", model.Content);
            col.AddWithValue("@IsPublished", model.IsPublished);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@DatePublish", model.DatePublish ?? (object)DBNull.Value);
        }
        private Blog MapSingleBlog(IDataReader reader, ref int startingIndex)
        {
            Blog aBlog = new Blog();


            aBlog.Id = reader.GetSafeInt32(startingIndex++);
            aBlog.Title = reader.GetSafeString(startingIndex++);
            aBlog.Subject = reader.GetSafeString(startingIndex++);
            aBlog.Content = reader.GetSafeString(startingIndex++);
            aBlog.IsPublished = reader.GetSafeBool(startingIndex++);
            aBlog.ImageUrl = reader.GetSafeString(startingIndex++);
            aBlog.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aBlog.DateModified = reader.GetSafeDateTime(startingIndex++);
            aBlog.DatePublish = reader.GetSafeDateTime(startingIndex++);
            aBlog.IsDeleted = reader.GetSafeBool(startingIndex++);
            aBlog.BlogType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            BaseUser aBaseUser = new BaseUser();
            aBlog.AuthorId = reader.GetSafeInt32(startingIndex++);
            aBaseUser.FirstName = reader.GetSafeString(startingIndex++);
            aBaseUser.LastName = reader.GetSafeString(startingIndex++);
            aBaseUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aBlog.Author = aBaseUser;

            return aBlog;
        }
    }
}