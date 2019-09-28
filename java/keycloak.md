
# Spring Boot & Keycloak

Reference Link
* [Secure a Spring Boot Rest app with Spring Security and Keycloak](https://sandor-nemeth.github.io/java/spring/2017/06/15/spring-boot-with-keycloak.html)

## Setup Keycloack

### Step 1: Set up Keycloack (follow the steps in "Secure a Spring Boot Rest app with Spring Security and Keycloak")

### Step 2: Get Configuration Form OpenID Configuration Endpoint:
http://localhost:8080/auth/realms/spring-security-example/.well-known/openid-configuration

Important URLs to be copied from responses
```json
{"issuer": "http://localhost:8080/auth/realms/spring-security-example",
  "authorization_endpoint": "http://localhost:8080/auth/realms/spring-security-example/protocol/openid-connect/auth",
  "token_endpoint": "http://localhost:8080/auth/realms/spring-security-example/protocol/openid-connect/token",
  "token_introspection_endpoint": "http://localhost:8080/auth/realms/spring-security-example/protocol/openid-connect/token/introspect",
  "userinfo_endpoint": "http://localhost:8080/auth/realms/spring-security-example/protocol/openid-connect/userinfo"
  ```

  Grant Type Supported
  ```json
  {"grant_types_supported": [
    "authorization_code",
    "implicit",
    "refresh_token",
    "password",
    "client_credentials"
  ]}
  ```

  Scopes Supported
  ```json
  {"scopes_supported": [
    "code",
    "none",
    "id_token",
    "token",
    "id_token token",
    "code id_token",
    "code token",
    "code id_token token"
  ]}
  ```

## Setup Spring Boot

### Step 1: Create Spring boot application
### Step 2: Import dependencies in pom.xml
This adds all needed dependencies:
* keycloak-spring-boot-starter for using Keycloak with Spring Boot
Security
```xml
<dependency>
	<groupId>org.keycloak</groupId>
	<artifactId>keycloak-spring-boot-starter</artifactId>
</dependency>
```
### Step 3: Create HelloEndpoint class
```java
@RestController
public class HelloEndpoint {

    @GetMapping("/admin/hello")
    @Secured("ROLE_ADMIN")
    public String sayHelloToAdmin() {
        return "Hello Admin";
    }

    @GetMapping("/user/hello")
    @Secured("ROLE_USER")
    public String sayHelloToUser() {
        return "Hello User";
    }

}
```
### Step 4: Create KeyCloakSecurityConfigurer class
```java
import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakPreAuthActionsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

@Configuration
@EnableWebSecurity
public class KeycloakSecurityConfigurer extends KeycloakWebSecurityConfigurerAdapter {

  @Bean
  public GrantedAuthoritiesMapper grantedAuthoritiesMapper() {
    SimpleAuthorityMapper mapper = new SimpleAuthorityMapper();
    mapper.setConvertToUpperCase(true);
    return mapper;
  }

  @Override
  protected KeycloakAuthenticationProvider keycloakAuthenticationProvider() {
    final KeycloakAuthenticationProvider provider = super.keycloakAuthenticationProvider();
    provider.setGrantedAuthoritiesMapper(grantedAuthoritiesMapper());
    return provider;
  }

  @Override
  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(keycloakAuthenticationProvider());
  }

  @Override
  protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
    return new NullAuthenticatedSessionStrategy();
  }

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    super.configure(http);
    http
        .authorizeRequests()
        .antMatchers("/admin/*").hasRole("ADMIN")
        .antMatchers("/user/*").hasRole("USER")
        .anyRequest().permitAll();
  }

  @Bean
  KeycloakConfigResolver keycloakConfigResolver() {
    return new KeycloakSpringBootConfigResolver();
  }
```
### Step 5: Add lines into application.properties
```properties
server.port=9002

keycloak.realm = spring-security-example
keycloak.bearer-only = true
keycloak.auth-server-url = http://localhost:8080/auth
keycloak.ssl-required = external
keycloak.resource = spring-security-demo-app
keycloak.use-resource-role-mappings = true
keycloak.principal-attribute = preferred_username
```

## Test
### Step 1: Get Token
```sh
curl --data "grant_type=password&client_id=curl&username=joe_admin&password=admin" http://localhost:8080/auth/realms/spring-security-example/protocol/openid-connect/token
```

### Step 2: Call api with token
```sh
curl -H "Authorization: bearer $TOKEN" http://localhost:9002/admin/hello
```
