package vn.five9.test.stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class StreamGeneration {
	List<Integer> numbers = Arrays.asList(7,2,5,4,2,1);

	public void withoutStream() {
		long count = 0;
		for (Integer number:numbers) {
			if (number % 2 == 0) {
				count++;
			}
		}
		System.out.printf("(1)There are %d elements that are even", count);
	}
	
	public void withStream() {
		long count = numbers.stream().filter(num -> num %2 ==0).count();
		System.out.printf("(2)There are %d elements that are even", count);
	}
	
	//Generate Stream from String: Arrays.stream() & Stream.of()
	public void streamFromArray() {
		System.out.println("streamFromArray");
		//Using Arrays.stream
		String[] languages = {"Java","C#","C++","PHP"};
		Stream<String> stringStream  = Arrays.stream(languages);
		stringStream.forEach(x -> System.out.printf(x));
		
		System.out.println();
		//Using Stream.of
		Stream<String> stringStream2 = Stream.of(languages);
		stringStream2.forEach(x -> System.out.printf(x));
		System.out.println();
	}
	
	//Generate Stream from Collection
	public void streamFromCollection() {
		System.out.println("streamFromCollection");
		List<String> items = new ArrayList<String>();
		items.add("Java");
		items.add("C#");
		items.add("C++");
		items.add("PHP");
		
		items.stream().forEach(item -> System.out.printf(item));
	}
	
	//Generate Stream with Regex
	public void streamUsingRegex() {
		System.out.println("streamUsingRegex");
		String strRegex = "Son,Mai,Xin chao,cac ban,viet nam";
		Pattern.compile(",").splitAsStream(strRegex).forEach(x -> System.out.println(x));
	}
}
