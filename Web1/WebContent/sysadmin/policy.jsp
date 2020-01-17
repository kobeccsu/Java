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
		</div><div class="table">
		<table>
			<thead>
				<tr>
					<th>User name</th><th>Role</th><th>Operate</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td><td></td><td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="addUser" style="display:none;">
		<div>
			<span>policy</span>
			<span><input type="text" name="policy" /></span>
		</div>
		<div>
			<input type="button" value="Create" />
		</div>
	</div>
	<script>
		$("#btnAddPolicy").on("click", function(){
			$(".addUser,.table").toggle();
		});
	</script>
	</div>
</body>
</html>