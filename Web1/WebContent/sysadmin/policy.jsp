<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Policy Management</title>
	
	<style>
		.edit,.del,.pager .wrap-pager span{
			color:blue;
			cursor:pointer;
		}
		.pager .wrap-pager span{
			margin-right:10px;
		}
	</style>
</head>
<body>
	<div>
		<div id="topbar"></div>
		<!--<div class="searchbar">
			<div>
				<label>search name</label>
				<input type="text" id="search_content" name="search_policyname" placeholder="input some info" />
				<input type="button" value="search" id="search" />
				<input type="button" value="add policy" id="btnAddPolicy"/>
			</div>
		</div>-->
		<!--<div class="table">
			<table>
				<thead>
					<tr>
						<th>Policy</th><th>Operate</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					
				</tbody>
			</table>
		</div>-->
		<!-- <div class="pager">
			<div class="wrap-pager" id="pager">
				
			</div>
		</div> -->
	<!-- <div class="addUser" style="display:none;">
		<hr/>
			<div>
				<span>policy</span>
				<span><input type="text" name="policy" id="policyname" /></span>
			</div>
			<div>
				<input type="button" value="Create" data-editid="" data-action="add" id="btnCreatePolicy" />
			</div>
	</div> -->
	<script>
		function buildPager(currentIndex, totalPageSize){

			var html = "";
			html += "<span>First</span>"
			if (currentIndex - 5 > 0){
				html += "<span>...</span>"
			}
			for (var i = currentIndex - 5 > 0 ? curentIndex - 5 : 1 ; i <= totalPageSize; i++){
				html += "<span data-pageindex='" + i + "'>" + i + '</span>';
			}
			if (totalPageSize - currentIndex > 5){
				html += "<span>...</span>"
			}
			html += "<span>Last</span>"
			return html;
		}
	
		// $("#btnAddPolicy").on("click", function(){
		// 	$(".addUser,.table").toggle();
		// 	$("#btnCreatePolicy").data('editid', '').data('action', 'add').val('Create');
		// 	$('#policyname').val('');
		// });
		
		//function addOrUpdate(obj){
			// $.ajax({
			// 	method:"post",
			// 	url: "<%=request.getContextPath()%>/Policy/" + $(obj).data('action'),
			// 	data: JSON.stringify({ id:$(obj).data('editid'), 'policyname': $("#policyname").val()}),
			// 	dataType:"json",
			// 	contentType:"application/json",
			// 	success:function(){
			// 		$(".addUser,.table").toggle();
			// 		$("#policyname").val('');
			// 		loadData(1);
			// 	},
			// 	error:function(e){
			// 		alert(e.statusText);
			// 	}
			// });
		//}
		
		// $("#btnCreatePolicy").on("click", function(){
		// 	addOrUpdate(this);
		// });
		
		// $(document).on("click", 'span.edit', function(){
		// 	$(".addUser").show();
		// 	$(".table").hide();
			
		// 	$("#btnCreatePolicy").data('editid', $(this).data("id"));
		// 	$("#btnCreatePolicy").data('action', 'update');
		// 	$("#btnCreatePolicy").val('Update');
		// 	$("#policyname").val($(this).closest("tr").find('td:first').text());
		// });
		
		// $(document).on("click", 'span.del', function(){
		// 	if (confirm("really to delete?")){
		// 		var id = $(this).data('id');
		// 		$.ajax({
		// 			method:'post',
		// 			url: "<%=request.getContextPath()%>/Policy/delete",
		// 			data: JSON.stringify({'id':id}),
		// 			dataType:"json",
		// 			contentType:"application/json",
		// 			success:function(){
		// 				loadData(1);
		// 			},
		// 			error:function(e){
		// 				alert(e.statusText);
		// 			}
		// 		})
		// 	}
		// });
		
		// load data
		// $(document).ready(function(){
		// 	//loadData(1);
		// });
		
		// $(document).on('click', '.pager .wrap-pager span', function(){
		// 	loadData($(this).data('pageindex'));
		// });
		
		// $('#search').on('click', function(){
		// 	loadData(1);
		// });
		
		//function loadData(pageIndex){
			// $.ajax({
			// 	method:'get',
			// 	url:'<%=request.getContextPath()%>/Policy',
			// 	data: {pageIndex: pageIndex, pageSize:10, queryText:$('#search_content').val()},
			// 	success:function(result){
			// 		var json = eval(result);
			// 		var concatTr = '';
			// 		for(var item in json.data){
			// 			concatTr += '<tr>';
			// 			concatTr += "<td>" + json.data[item].policyname + "</td><td><span class='edit' data-id='" +
			// 				json.data[item].id + "'>Edit</span>|<span class='del' data-id='" + json.data[item].id + "'>Delete</span></td>"
			// 			concatTr += '</tr>';
			// 		}
			// 		var pagerHtml = buildPager(1, json.totalCount);
					
			// 		$("#tableBody").html(concatTr);
			// 		$('#pager').html(pagerHtml);
			// 	},
			// 	error:function(){
			// 		alert(e.statusText);
			// 	}
			// });
		//}
	</script>
	<script src="../static/dist/js/sysadmin/policy.js"></script>
	</div>
</body>
</html>