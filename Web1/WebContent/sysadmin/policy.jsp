<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Policy Management</title>
	<script type="text/javascript" src="../static/js/jquery.min.js"></script>
	<script type="text/javascript" src="../static/js/jquery.template.js"></script>
	<style>
		.edit,.del{
			color:blue;
			cursor:pointer;
		}
	</style>
</head>
<body>
	<div>
		<div class="searchbar">
			<div>
				<label>search name</label>
				<input type="text" name="search_policyname" placeholder="input some info" />
				<input type="button" value="search" />
				<input type="button" value="add policy" id="btnAddPolicy"/>
			</div>
		</div>
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>Policy</th><th>Operate</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					
				</tbody>
			</table>
		</div>
	<div class="addUser" style="display:none;">
		<hr/>
			<div>
				<span>policy</span>
				<span><input type="text" name="policy" id="policyname" /></span>
			</div>
			<div>
				<input type="button" value="Create" data-editid="" data-action="add" id="btnCreatePolicy" />
			</div>
	</div>
	<script>
		$("#btnAddPolicy").on("click", function(){
			$(".addUser,.table").toggle();
			$("#btnCreatePolicy").data('editid', '').data('action', 'add').val('Create');
			$('#policyname').val('');
		});
		
		function addOrUpdate(obj){
			$.ajax({
				method:"post",
				url: "<%=request.getContextPath()%>/Policy",
				data: JSON.stringify({'action':$(obj).data('action'),id:$(obj).data('editid'),'policyname': $("#policyname").val()}),
				dataType:"json",
				contentType:"application/json",
				success:function(){
					console.log('add success');
					$(".addUser,.table").toggle();
					$("#policyname").val('');
					loadData();
				},
				error:function(e){
					alert(e.statusText);
				}
			});
		}
		
		$("#btnCreatePolicy").on("click", function(){
			addOrUpdate(this);
		});
		
		$(document).on("click", 'span.edit', function(){
			$(".addUser").show();
			$(".table").hide();
			
			$("#btnCreatePolicy").data('editid', $(this).data("id"));
			$("#btnCreatePolicy").data('action', 'edit');
			$("#btnCreatePolicy").val('Update');
			$("#policyname").val($(this).closest("tr").find('td:first').text());
		});
		
		$(document).on("click", 'span.del', function(){
			if (confirm("really to delete?")){
				var id = $(this).data('id');
				$.ajax({
					method:'post',
					url: "<%=request.getContextPath()%>/Policy",
					data: JSON.stringify({'action':'delete', 'id':id}),
					dataType:"json",
					contentType:"application/json",
					success:function(){
						loadData();
					},
					error:function(e){
						alert(e.statusText);
					}
				})
			}
		});
		
		// load data
		$(document).ready(function(){
			loadData();
		});
		
		function loadData(){
			$.ajax({
				method:'get',
				url:'<%=request.getContextPath()%>/Policy',
				success:function(result){
					var data = eval(result);
					var concatTr = '';
					for(var item in data){
						concatTr += '<tr>';
						concatTr += "<td>" + data[item].policyname + "</td><td><span class='edit' data-id='" + data[item].id + "'>Edit</span>|<span class='del' data-id='" + data[item].id + "'>Delete</span></td>"
						concatTr += '</tr>';
					}
					$("#tableBody").html(concatTr);
				},
				error:function(){
					alert(e.statusText);
				}
			});
		}
	</script>
	
	</div>
</body>
</html>