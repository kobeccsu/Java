<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Policy Management</title>
	<script type="text/javascript" src="../static/js/jquery.min.js"></script>
</head>
<body>
	<div>
		<div class="searchbar">
			<div>
				<label>search name</label>
				<input type="text" name="search_policyname" placeholder="input some info" />
				<input type="button" value="search" />
				<input type="button" value="add role" id="btnAddPolicy"/>
			</div>
		</div>
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>Policy</th><th>Operate</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td><td></td>
					</tr>
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
				<input type="button" value="Create" id="btnCreatePolicy" />
			</div>
	</div>
	<script>
		$("#btnAddPolicy").on("click", function(){
			$(".addUser,.table").toggle();
		});
		
		$("#btnCreatePolicy").on("click", function(){
			$.ajax({
				method:"post",
				url: "<%=request.getContextPath()%>/Policy",
				data: JSON.stringify({'policyname': $("#policyname").val()}),
				dataType:"json",
				contentType:"application/json",
				success:function(){
					alter("success");
				},
				error:function(e){
					alert(e.status);
				}
			});
		});
	</script>
	</div>
</body>
</html>