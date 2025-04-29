import exp from "constants";
import { del, get, patch, post, postForm, patchForm, put, deleted } from "./api";

//auth
export const sendOtp = (data) => post("/otps/send", data);
export const postSignup = (data) => post("/users/register", data);
export const postLogin = (data) => post("/auth/login", data);
export const postVerifyOTP = (data) => post("/auth/forget-password/verify-otp", data);
export const updatePassword = (data) => patch("/auth/password-update", data);

//sent Message 
export const sentMessage = (data) => post('/contacts/send', data)

//site management
export const fetchPageContent = (data) => get("/settings/pages/site", data)
export const fetchPageContentTheme1 = (data) => get("/settings/pages/site?slug=home_page", data)

export const fetchPageContentTheme2 = (data) => get("/settings/pages/site?slug=home_page", data)
export const fetchPageContentTheme3 = (data) => get("/settings/pages/site?slug=home_page", data)
export const postPageContent = (data) => post("/settings/pages", data);
export const putPageContent = (data) => put("/settings/pages", data);
export const updatePageContent = (data) => patch("/settings/pages", data)

export const fetchSettings = (data) => get("/settings", data);
export const fetchPublicSettings = (data) => get("/settings/site", data);
export const updateSettings = (data) => patch("/settings", data);
export const postSettings = (data) => post("/settings", data);
export const fetchEmailSettings = (data) => get("/settings", data);
export const postEmailSettings = (data) => post("/settings", data);
export const fetchsSMSSettings = (data) => get("/settings?fields=phone_config", data);
export const postsSMSSettings = (data) => post("/settings?fields=phone_config", data);

//user management
export const fetchUserList = (data) => get('/users', data)
export const fetchUserDetailsByAdmin = (data) => get('/user/details/admin-panel', data)
export const deleteUserByAdmin = (data) => del(`/users/${data._id}`)
export const updatePasswordByAdmin = (data) => patch('/users/password-update', data)
export const updateUserStatusByAdmin = (data) => patch('/user/accountant-activation', data)
export const fetchUser = (data) => get("/users/profile", data);
export const postResetPassword = (data) => post("/auth/forget-password/submit", data, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.accessToken ? data.accessToken : ''}` } });
// Newsletter
export const fetchNewsletterList = (data) => get('/subscribers', data)
export const postNewsletterList = (data) => post('/subscribers', data)
export const fetchNewsletterDetails = (data) => get(`/newsletters/${data._id}`, data)
export const postNewsletter = (data) => post('/newsletters', data)
export const postNewsletterMessage = (data) => post(`/subscribers/send-email`, data)
export const patchNewsletter = (data) => patch(`/newsletters/${data._id}`, data)
export const deleteNewsletter = (data) => del(`/subscribers/${data._id}`)
//translation
export const fetchTranslations = (data) => get("/settings/languages/site", data);
export const fetchAllLanguages = (data) => get("/settings/languages/site", data);
export const fetchAdminLanguages = (data) => get("/settings/languages", data);
export const putLanguage = (data) => put("/settings/languages", data);
export const postLanguage = (data) => post("/settings/languages", data);
export const delLanguage = (data) => del(`/settings/languages/${data._id}`);

// get user and Update user
export const getUser = (data) => get("/users/profile", data);
export const updateUser = (data) => patch("/users/profile", data);
//FAQ
export const fetchFAQ = (data) => get("/faqs", data)
export const deleteFAQ = (data) => del(`/faqs/${data._id}`)
export const postFAQ = (data) => post(`/faqs`, data)
export const updatedFAQ = (data) => put(`/faqs`, data)

//blog tag
export const blogTagGet = (data) => get('/blog-tags', data)
export const blogTagUpdate = (data) => put(`/blog-tags`, data)
export const blogTagCreate = (data) => post('/blog-tags', data)
export const blogTagDelete = (data) => del(`/blog-tags/${data._id}`)

//blog categories
export const blogCategoriesGet = (data) => get('/blog-categories', data)
export const blogCategoriesUpdate = (data) => put(`/blog-categories`, data)
export const blogCategoriesCreate = (data) => post('/blog-categories', data)
export const blogCategoriesDelete = (data) => del(`/blog-categories/${data._id}`)
export const getBlogCategoriesPublic = (data) => get("/blogs/categories", data);

//blogs 
export const blogGet = (data) => get('/blogs', data)
export const blogUpdate = (data) => put(`/blogs`, data)
export const blogCreate = (data) => post('/blogs', data)
export const blogDelete = (data) => del(`/blogs/${data._id}`)
export const getPublicBlog = (data) => get('/blogs/site', data)
export const getLatestPublicBlog = (data) => get('/blogs/site?is_latest=true', data)
export const getLatestPublicBlogSite = (data) => get('/blogs/site', data)

//image upload 
export const singleImageUpload = (data) => postForm('/files/single-image-upload', data);
export const singlePDFUpload = (data) => postForm('/files/single-pdf-upload', data);
export const multipleImageUpload = (data) => postForm('/files/multiple-image-upload', data);
export const deleteImage = (data) => deleted(`/files/file-remove`, data);

// advertisement
export const PostAdvertisement = (data) => post('/advertisements', data)
export const UpdateAdvertisement = (data) => put(`/advertisements`, data)
export const GetAdvertisement = (data) => get('/advertisements', data)
export const getAllPublicAdvertisement = (data) => get('/advertisements/site', data)
export const DeleteAdvertisement = (data) => del(`/advertisements/${data._id}`)

//HRM
export const CreateEmployee = (data) => post('/users/employees', data)
export const UpdateEmployee = (data) => put('/users/employees', data)
export const GetAllEmployees = (data) => get('/users/employees', data)
export const DeleteAEmployee = (data) => del(`/users/${data._id}`, data)
export const CreateRoles = (data) => post('/hrm/roles', data)
export const GetAllRoles = (data) => get('/hrm/roles', data)
export const UpdateRoles = (data) => put('hrm/roles', data)
export const DeleteARole = (data) => del(`/hrm/roles/${data._id}`, data)
export const AssignPermissions = (data) => patch('/hrm/roles/permissions', data)
export const GetAllPermission = (data) => get('/hrm/roles/permissions', data)

// Event Management
export const CreateEventCategory = (data) => post('/event-categories', data)
export const GetAllEventCategories = (data) => get('/event-categories', data)
export const UpdateEventCategories = (data) => put('event-categories', data)
export const DeleteEventCategories = (data) => del(`/event-categories/${data._id}`, data)
export const GetPublicEventCategories = (data) => get('/event-categories/categories', data)

export const CreateEvent = (data) => post('/events', data)
export const GetAllEvents = (data) => get('/events', data)
export const UpdateEvent = (data) => put('/events', data)
export const DeleteEvent = (data) => del(`/events/${data._id}`, data)
export const GetAllPublicEvents = (data) => get('/events/site', data)


//service management
export const CreateServiceCategory = (data) => post('/service-categories', data)
export const GetAllServiceCategories = (data) => get('/service-categories', data)
export const UpdateServiceCategory = (data) => put('service-categories', data)
export const DeleteServiceCategory = (data) => del(`/service-categories/${data._id}`, data)
export const GetPublicServiceCategories = (data) => get('/service-categories/site', data)

export const CreateService = (data) => post('/services', data)
export const GetAllServices = (data) => get('/services', data)
export const getAllPublicServices = (data) => get('/services/site', data)
export const UpdateService = (data) => put('services', data)
export const DeleteService = (data) => del(`/services/${data._id}`, data)

// service Tag
export const createServiceTag = (data) => post('/service-tags', data)
export const getAllServiceTags = (data) => get('/service-tags', data)
export const updateServiceTag = (data) => put('service-tags', data)
export const deleteServiceTag = (data) => del(`/service-tags/${data._id}`, data)

//providers
export const CreateProvider = (data) => post('/providers', data)
export const GetAllProviders = (data) => get('/providers', data)
export const UpdateProvider = (data) => put('providers', data)
export const DeleteProvider = (data) => del(`/providers/${data._id}`, data)
export const GetPublicProviders = (data) => get('/providers/site', data)

//contact
export const createContact = (data) => post('/contacts/send', data)
export const getAllContacts = (data) => get('/contacts', data)
export const updateContact = (data) => put('contacts', data)
export const deleteContact = (data) => del(`/contacts/${data._id}`, data)

//jobCategory
export const createJobCategory = (data) => post('/job-categories', data)
export const getAllJobCategories = (data) => get('/job-categories', data)
export const updateJobCategory = (data) => put('job-categories', data)
export const deleteJobCategory = (data) => del(`/job-categories/${data._id}`, data)
export const getPublicJobCategories = (data) => get('/job-categories/categories', data)

//job
export const createJob = (data) => post('/jobs', data)
export const getAllJobs = (data) => get('/jobs', data)
export const updateJob = (data) => put('jobs', data)
export const deleteJob = (data) => del(`/jobs/${data._id}`, data)
export const getPublicJobs = (data) => get('/jobs/site', data)

//apply job
export const createApplyJob = (data) => post('/job-applies', data)
export const getApplyJobByUser = (data) => get('/job-applies/site', data)
export const getAllApplyJobsByAdmin = (data) => get('/job-applies', data)
export const deleteApplyJobByAdmin = (data) => del(`/job-applies/${data._id}`, data)

//review
export const getAllReviewsByAdmin = (data) => get('/reviews', data)
export const updateReviewByAdmin = (data) => put('reviews', data)
export const deleteReviewByAdmin = (data) => del(`/reviews/${data._id}`, data)

export const createReviewByUser = (data) => post('/reviews', data)
export const getSpecificUserReview = (data) => get('/reviews/site', data)
export const getAllPublicReviews = (data) => get('/reviews/site', data)
export const deleteReviewByUser = (data) => del(`/reviews/${data._id}`)

//project category
export const createProjectCategory = (data) => post('/product-categories', data)
export const getAllProjectCategories = (data) => get('/product-categories', data)
export const updateProjectCategory = (data) => put('/product-categories', data)
export const deleteProjectCategory = (data) => del(`/product-categories/${data._id}`, data)
export const getPublicProjectCategories = (data) => get('/product-categories', data)

//projects
export const createProject = (data) => post('/products', data)
export const getAllProjects = (data) => get('/products', data)
export const updateProject = (data) => put('/products', data)
export const deleteProject = (data) => del(`/products/${data._id}`, data)
export const getPublicProjects = (data) => get('/products/site', data)

//support ticket
export const createSupportTicketByUser = (data) => post('/supports', data)
export const getAllSupportTicketsByUser = (data) => get('/supports/site', data)
export const getAllSupportTicketsByAdmin = (data) => get('/supports', data)
export const deleteSupportTicket = (data) => del(`/supports/${data._id}`, data)

//case study tags
export const createCaseStudyTag = (data) => post('/case-tags', data)
export const getAllCaseStudyTags = (data) => get('/case-tags', data)
export const updateCaseStudyTag = (data) => put('/case-tags', data)
export const deleteCaseStudyTag = (data) => del(`/case-tags/${data._id}`, data)

//case study category
export const createCaseStudyCategory = (data) => post('/case-categories', data)
export const getAllCaseStudyCategories = (data) => get('/case-categories', data)
export const updateCaseStudyCategory = (data) => put('/case-categories', data)
export const deleteCaseStudyCategory = (data) => del(`/case-categories/${data._id}`, data)

//case study
export const createCaseStudy = (data) => post('/cases', data)
export const getAllCaseStudies = (data) => get('/cases', data)
export const updateCaseStudy = (data) => put('/cases', data)
export const deleteCaseStudy = (data) => del(`/cases/${data._id}`, data)
export const getPublicCaseStudies = (data) => get('/cases/site', data)

//product Payment
export const createProductPayment = (data) => post('/products/payment', data)
export const confirmProductPayments = (data) => patch('/products/payment', data)

//Event Payment
export const createEventPayment = (data) => post('/events/payment', data)
export const confirmEventPayments = (data) => patch('/events/payment', data)

//Product Order
export const getAllOrders = (data) => get('/products/orders', data)
export const updateOrderStatus = (data) => patch('/products/orders', data)

//Event Booking
export const getAllEventBooking = (data) => get('/events/bookings', data)
export const updateEventBookingStatus = (data) => patch('/events/booking', data)

//Dashboard
export const getDashboardData = (data) => get('/dashboards', data)

//product review
export const createProductReview = (data) => post('/product-reviews', data)
export const getPublicProductReview = (data) => get('/product-reviews/site', data)
export const getAllProductReviewByAdmin = (data) => get('/product-reviews', data)
export const updateProductReviewByAdmin = (data) => put('/product-reviews', data)
export const deleteProductReviewByAdmin = (data) => del(`/product-reviews/${data._id}`, data)