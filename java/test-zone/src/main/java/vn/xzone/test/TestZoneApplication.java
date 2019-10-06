package vn.xzone.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import vn.xzone.test.stream.ParallelStream;




@SpringBootApplication
public class TestZoneApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(TestZoneApplication.class, args);		
		
		ParallelStream.streamParallel();
	}

}
