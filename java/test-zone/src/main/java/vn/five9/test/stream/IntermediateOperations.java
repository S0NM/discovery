package vn.five9.test.stream;

import java.util.Arrays;
import java.util.Comparator;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class IntermediateOperations {

	public void useFilter() {
		// Generate stream with 20 number
//		Stream.iterate(1, n -> n+1).limit(20).forEach(System.out::println);

		// Generate stream with 20 numbers and apply skip() and filter()
		Stream.iterate(1, n -> n + 1).filter(number -> number % 2 == 0).skip(2).limit(6).forEach(System.out::println);
	}

	public void useMap() {
		List<String> data = Arrays.asList("Java", "C#", "C++", "PHP", "Javascript");

		data.stream().map(String::toUpperCase).forEach(System.out::println);
	}

	public void useSorted() {
		List<String> data = Arrays.asList("Java", "C#", "C++", "PHP", "Javascript");
		System.out.println("========Part 1=========");
		// sorted according to natural order
		data.stream().sorted().forEach(System.out::println);

		System.out.println("========Part 2=========");
		// sorted according to the provided Comparator
		data.stream().sorted((s1, s2) -> s1.length() - s2.length()).forEach(System.out::println);
	}

	// Use collect() to convert result to Collection
	public void useCollect() {
		Stream<String> stream = Stream.of("Java", "C#", "C++", "PHP", "Javascript");
		List<String> languages = stream.collect(Collectors.toList());
		System.out.println(languages);
	}

	// Finding a String in a stream
	public void useAnyMatch() {
		List<String> data = Arrays.asList("Java", "C#", "C++", "PHP", "Javascript");
		boolean result = data.stream().anyMatch((s) -> s.equalsIgnoreCase("Java"));
		System.out.println("Matching Result:" + result);
	}

	// Calculate the total number
	public void useCount() {
		List<Integer> data = Arrays.asList(2, 3, 4, 5, 6, 7, 8);

		long count = data.stream().filter(number -> number % 2 == 0).count();
		System.out.println("Total number: " + count);
	}

	// Findg min and max in s tream
	public void useMinMax() {
		List<Integer> data = Arrays.asList(2, 3, 4, 15, 6, 7, 8);

		Integer min = data.stream().mapToInt(v -> v).min().getAsInt();
		System.out.println("Min value:" + min);

		Integer max = data.stream().mapToInt(v -> v).max().getAsInt();
		System.out.println("Max value:" + max);

		Integer maxNumber = data.stream().max(Comparator.comparing(Integer::valueOf)).get();
		System.out.println("maxNumber value:" + maxNumber);

		Integer minNumber = data.stream().min(Comparator.comparing(Integer::valueOf)).get();
		System.out.println("minNumber value:" + minNumber);
	}
	
	//Finding min & max with object
	public void useMinMaxwithObject() {
		List<Programming> data = Arrays.asList(
				new Programming("Java", 5), //
                new Programming("PHP", 2), //
                new Programming("C#", 1) //
			);
		
		Programming max = data.stream().max(Comparator.comparing(Programming::getExp)).get();
		System.out.println("Max in Programming:"+ max.getName());
	}
	
	//Using summaryStatistics
	public void useSummaryStatistics() {
		 List<Integer> primes = Arrays.asList(2, 3, 5, 7, 10);
		 
	        IntSummaryStatistics stats = primes.stream().mapToInt((x) -> x).summaryStatistics();
	        System.out.println("Count: " + stats.getCount());
	        System.out.println("Max: " + stats.getMax());
	        System.out.println("Min: " + stats.getMin());
	        System.out.println("Sum: " + stats.getSum());
	        System.out.println("Average: " + stats.getAverage());
	}
}
