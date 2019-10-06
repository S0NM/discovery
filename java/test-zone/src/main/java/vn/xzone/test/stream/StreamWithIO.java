package vn.xzone.test.stream;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class StreamWithIO {
	
	public void readFile() {
		String fileName = "line.txt";
		
		try (Stream<String> stream = Files.lines(Paths.get(fileName))){
			stream
				.onClose(() -> System.out.println("Done"))
				.filter(s -> s.startsWith("line3"))
				.forEach(System.out::println);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
