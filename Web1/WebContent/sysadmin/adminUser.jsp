<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>User management</title>
<script type="text/javascript" src="../static/js/jquery.min.js"></script>
</head>
<body>
	<div>
		<div class="searchbar">
			<div>
				<label>search name</label>
				<input type="text" name="searchusername" placeholder="input some infor" />
				<input type="button" value="search" />
				<input type="button" value="add user" id="btnAddUser"/>
			</div>
		</div>
	</div>
	<div class="table">
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
			<span>username</span>
			<span><input type="text" name="username" /></span>
		</div>
		<div>
			<span>role</span>
			<span><input type="text" name="role" /></span>
		</div>
		<div>
			<input type="button" value="Create" />
		</div>
	</div>
	<script>
		$("#btnAddUser").on("click", function(){
			$(".addUser,.table").toggle();
		});
	</script>
</body>
</html>