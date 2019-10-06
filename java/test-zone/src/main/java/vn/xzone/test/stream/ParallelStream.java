package vn.xzone.test.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ParallelStream {
	
	public static void streamSequential() {
		List<String> values = createDummyData();
		 
        long startTime = System.currentTimeMillis();
        System.out.println("Start Sorting....");
 
        values.stream().sorted().limit(10).forEach(System.out::println);
 
        long endTime = System.currentTimeMillis();
        System.out.println("End Sorting....");
 
        long millis = endTime - startTime;
 
        System.out.println(String.format("sequential sort took: %d ms", millis));   
      
	}
	
	public static void streamParallel() {
		List<String> values = createDummyData();
		 
        long startTime = System.currentTimeMillis();
        System.out.println("Start Sorting....");
 
        values.parallelStream().sorted().limit(10).forEach(System.out::println);
 
        long endTime = System.currentTimeMillis();
        System.out.println("End Sorting....");
 
        long millis = endTime - startTime;
 
        System.out.println(String.format("parallelStream sort took: %d ms", millis));  
	}
	
	public static List<String> createDummyData() {
        int MAX = 10000000;
        List<String> values = new ArrayList<>(MAX);
        for (int i = 0; i < MAX; i++) {
            UUID uuid = UUID.randomUUID();
            values.add(uuid.toString());
        }
        return values;
    }
}
