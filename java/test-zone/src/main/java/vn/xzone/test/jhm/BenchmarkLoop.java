package vn.five9.test.jhm;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.annotations.State;
import org.openjdk.jmh.infra.Blackhole;

@State(Scope.Benchmark)
public class BenchmarkLoop {

	@Param({ "1000000" })
	private int N;

	private List<Integer> DATA_FOR_TESTING;

	@Setup
	public void setup() {
		DATA_FOR_TESTING = createData();
	}

	// Create Data for testing only
	private List<Integer> createData() {
		List<Integer> data = new ArrayList<Integer>();
		for (int i = 0; i < N; i++) {
			data.add(i);
		}
		return data;
	}

	// ========================= Benchmark Methods ===========================

	@Benchmark
	public void withoutStream(Blackhole bh) {
		List<Double> result = new ArrayList<Double>(DATA_FOR_TESTING.size() / 2 + 1);
		for (Integer i : DATA_FOR_TESTING) {
			if (i % 2 == 0) {
				result.add(Math.sqrt(i));
				bh.consume(i);
			}
		}
	}

	@Benchmark
	public List<Double> withStream() {
		return DATA_FOR_TESTING.stream().filter(i -> i % 2 == 0).map(Math::sqrt)
				.collect(Collectors.toCollection(() -> new ArrayList<>(DATA_FOR_TESTING.size() / 2 + 1)));
	}
	
	
	//=================== Use it in main class
//	try {
//		Options opt = new OptionsBuilder().include(BenchmarkLoop.class.getSimpleName()).mode(Mode.AverageTime)
//				.timeUnit(TimeUnit.MILLISECONDS).warmupIterations(1).measurementIterations(2).forks(2).build();
//		new Runner(opt).run();
//	} catch (Exception e) {
//		e.printStackTrace();
//	}

}
