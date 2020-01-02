package jdbc;

import java.awt.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.leizhou.bean.Website;

@Component("jdbc")
public class JdbcTest {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List getOne(int id) {
		return null;
		//return jdbcTemplate.query("select * from Websites;", new BeanPropertyRowMapper(Website.class));
	}
}
