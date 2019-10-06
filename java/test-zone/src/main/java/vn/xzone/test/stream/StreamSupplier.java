package vn.xzone.test.stream;

import java.util.function.Supplier;
import java.util.stream.Stream;

public class StreamSupplier {
	public void useSupplier() {
		Supplier<Stream<String>> streamSupplier = //
				() -> Stream.of("Java", "C#", "C++", "PHP", "Javascript") //
						.filter(s -> s.startsWith("J"));

		streamSupplier.get().anyMatch(s -> true); // ok
		streamSupplier.get().noneMatch(s -> true); // ok
	}
}
