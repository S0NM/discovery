package vn.xzone.test.caching;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class PlainCalculationService {
	
	
	// Simulate heavy calculation workload
	@Cacheable(value = "mycalculation", key = "#id")
	public String heavyCalculation(String id) {
		String test = id;
		try {
			Thread.sleep(1500);
		} catch (Exception e) {
		}
		return test;
	}
}
