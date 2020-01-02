package com.leizhou;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Servlet implementation class UploadServlet
 */
@WebServlet("/UploadServlet")
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static final String UPLOAD_DIRECTORY = "upload";
	
	// 上传配置
    private static final int MEMORY_THRESHOLD   = 1024 * 1024 * 3;  // 3MB
    private static final int MAX_FILE_SIZE      = 1024 * 1024 * 40; // 40MB
    private static final int MAX_REQUEST_SIZE   = 1024 * 1024 * 50; // 50MB
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (!ServletFileUpload.isMultipartContent(request)) {
			PrintWriter printWriter = response.getWriter();
			printWriter.println("错误的数据");
			printWriter.flush();
			return;
		}
		
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(MEMORY_THRESHOLD);
		factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
		
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(MAX_REQUEST_SIZE);
		upload.setFileSizeMax(MAX_FILE_SIZE);
		upload.setHeaderEncoding("UTF-8");
		
		String uploadPath = getServletContext().getRealPath("/") + File.separator + UPLOAD_DIRECTORY;
		File uploadDir = new File(uploadPath);
		if (!uploadDir.exists()) {
			uploadDir.mkdir();
		}
		
		try {
			@SuppressWarnings("unchecked")
			List<FileItem> formItems = upload.parseRequest(request);
			if (formItems != null && formItems.size() > 0) {
				for (FileItem item : formItems) {
					if (!item.isFormField()) {
						String fileName = new File(item.getName()).getName();
						String filePath = uploadPath + File.separator + fileName;
						File storeFile = new File(filePath);
						System.out.println(filePath);
						item.write(storeFile);
						request.setAttribute("messsage", "文件上传成功!");
					}
					
				}
				
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		getServletContext().getRequestDispatcher("/message.jsp").forward(request, response);
		//doGet(request, response);
	}

}
