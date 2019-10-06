Using EhCache in Spring Boot

Reference
* [Check this example for more information](https://springframework.guru/using-ehcache-3-in-spring-boot/)

# 1. Example

### Step 1: Import dependencies in pom.xml
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
	<groupId>javax.cache</groupId>
	<artifactId>cache-api</artifactId>
</dependency>
<dependency>
	<groupId>org.ehcache</groupId>
	<artifactId>ehcache</artifactId>
	<version>3.7.1</version>
</dependency>
```

### Step 2: Enable Caching 
```java
@SpringBootApplication
@EnableCaching
public class DemoCachingApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(DemoCachingApplication.class, args);
	}
}
```
### Step 3: Create ehcache.xml file in classpath folder
```java
<config xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
	xmlns='http://www.ehcache.org/v3'
	xsi:schemaLocation="
            http://www.ehcache.org/v3 
            http://www.ehcache.org/schema/ehcache-core-3.7.xsd">
	<!-- Persistent cache directory -->
	<persistence directory="spring-boot-ehcache/cache" />
	<!-- Default cache template -->
	<cache-template name="default">
		<expiry>
			<ttl unit="seconds">30</ttl>
		</expiry>
		<listeners>
			<listener>
				<class>vn.xzone.test.caching.CacheLogger</class>
				<event-firing-mode>ASYNCHRONOUS</event-firing-mode>
				<event-ordering-mode>UNORDERED</event-ordering-mode>
				<events-to-fire-on>CREATED</events-to-fire-on>
				<events-to-fire-on>EXPIRED</events-to-fire-on>
				<events-to-fire-on>EVICTED</events-to-fire-on>
			</listener>
		</listeners>
		<resources>
			<heap>1000</heap>
			<offheap unit="MB">10</offheap>
			<disk persistent="true" unit="MB">20</disk>
		</resources>
	</cache-template>
	<!-- Cache Configuration -->
	<cache alias="mycalculation" uses-template="default">
		<key-type>java.lang.String</key-type>
		<value-type>java.lang.String</value-type>
	</cache>
</config>
```
Note: You must declare the cachename that is used in our application
```xml
<!-- Cache Configuration -->
	<cache alias="mycalculation" uses-template="default">
		<key-type>java.lang.String</key-type>
		<value-type>java.lang.String</value-type>
	</cache>
```

### Step 3: Let create test case
Create PlainCalculationService
```java
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
```
Call it on main application class
```java
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
```