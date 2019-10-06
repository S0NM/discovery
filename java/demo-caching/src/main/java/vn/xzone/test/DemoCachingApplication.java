package vn.xzone.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.event.EventListener;

import vn.xzone.test.caching.PlainCalculationService;

@SpringBootApplication
@EnableCaching
public class DemoCachingApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(DemoCachingApplication.class, args);
	}
	
	@Autowired
	PlainCalculationService service;
	
	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {
		long startTime, duration = 0;
		for (int i =0;i< 5;i++) {
			startTime = System.currentTimeMillis();
			System.out.println("Result:"+ service.heavyCalculation("mykey"));
			duration = System.currentTimeMillis() - startTime;
			System.out.println("Took:"+duration);
		}
	}

}
