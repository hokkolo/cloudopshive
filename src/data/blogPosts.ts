export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Kubernetes on AWS',
    excerpt: 'Learn how to deploy and manage Kubernetes clusters on Amazon Web Services with best practices for production environments.',
    author: 'Sarah Chen',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    category: 'Kubernetes',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
      <p>Kubernetes has become the de facto standard for container orchestration, and AWS provides excellent support for running Kubernetes workloads. In this comprehensive guide, we'll walk through setting up a production-ready Kubernetes cluster on AWS.</p>
      
      <h2>Why Kubernetes on AWS?</h2>
      <p>Amazon Elastic Kubernetes Service (EKS) offers a managed Kubernetes control plane, reducing operational overhead while providing enterprise-grade security and reliability. Here are the key benefits:</p>
      
      <ul>
        <li><strong>Managed Control Plane:</strong> AWS handles the Kubernetes API server, etcd, and other control plane components</li>
        <li><strong>High Availability:</strong> Multi-AZ deployment ensures your cluster remains available</li>
        <li><strong>Security:</strong> Integration with AWS IAM and VPC for robust security controls</li>
        <li><strong>Scalability:</strong> Auto-scaling capabilities for both nodes and pods</li>
      </ul>
      
      <h2>Setting Up Your First EKS Cluster</h2>
      <p>Before we begin, ensure you have the following prerequisites:</p>
      
      <ul>
        <li>AWS CLI configured with appropriate permissions</li>
        <li>kubectl installed on your local machine</li>
        <li>eksctl for simplified cluster management</li>
      </ul>
      
      <p>The journey to production-ready Kubernetes starts with proper planning and understanding of your workload requirements. In our next post, we'll dive deeper into advanced networking configurations and security best practices.</p>
    `
  },
  {
    id: '2',
    title: 'CI/CD Pipeline Best Practices for Modern Applications',
    excerpt: 'Discover how to build robust CI/CD pipelines that ensure fast, reliable deployments while maintaining code quality and security.',
    author: 'Mike Rodriguez',
    date: 'Jan 12, 2025',
    readTime: '6 min read',
    category: 'DevOps',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
      <p>A well-designed CI/CD pipeline is the backbone of modern software development. It enables teams to deliver features faster while maintaining high quality and reducing deployment risks.</p>
      
      <h2>Core Principles of Effective CI/CD</h2>
      <p>Every successful CI/CD implementation follows these fundamental principles:</p>
      
      <ul>
        <li><strong>Automation First:</strong> Minimize manual intervention in the deployment process</li>
        <li><strong>Fast Feedback:</strong> Provide quick feedback to developers about code quality</li>
        <li><strong>Fail Fast:</strong> Catch issues early in the development cycle</li>
        <li><strong>Rollback Capability:</strong> Always have a way to quickly revert changes</li>
      </ul>
      
      <h2>Pipeline Stages</h2>
      <p>A typical CI/CD pipeline consists of several stages, each serving a specific purpose:</p>
      
      <ol>
        <li><strong>Source Control:</strong> Code changes trigger the pipeline</li>
        <li><strong>Build:</strong> Compile and package the application</li>
        <li><strong>Test:</strong> Run automated tests to ensure code quality</li>
        <li><strong>Security Scan:</strong> Check for vulnerabilities and compliance</li>
        <li><strong>Deploy:</strong> Release to staging and production environments</li>
      </ol>
      
      <p>Remember, the goal is not just to automate deployment, but to create a reliable, repeatable process that gives your team confidence in every release.</p>
    `
  },
  {
    id: '3',
    title: 'Cloud Security: Protecting Your Infrastructure',
    excerpt: 'Essential security practices for cloud infrastructure, including identity management, network security, and compliance frameworks.',
    author: 'Alex Thompson',
    date: 'Jan 10, 2025',
    readTime: '10 min read',
    category: 'Security',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
      <p>Cloud security is not just an IT concern—it's a business imperative. As organizations migrate more workloads to the cloud, understanding and implementing robust security measures becomes critical for protecting sensitive data and maintaining customer trust.</p>
      
      <h2>The Shared Responsibility Model</h2>
      <p>Understanding the shared responsibility model is crucial for cloud security. While cloud providers secure the infrastructure, customers are responsible for securing their data, applications, and access management.</p>
      
      <h2>Key Security Areas</h2>
      
      <h3>Identity and Access Management (IAM)</h3>
      <ul>
        <li>Implement least privilege access principles</li>
        <li>Use multi-factor authentication (MFA) for all accounts</li>
        <li>Regular access reviews and cleanup of unused permissions</li>
        <li>Service account management and rotation</li>
      </ul>
      
      <h3>Network Security</h3>
      <ul>
        <li>Virtual Private Cloud (VPC) configuration</li>
        <li>Security groups and network ACLs</li>
        <li>VPN and private connectivity options</li>
        <li>Web Application Firewalls (WAF)</li>
      </ul>
      
      <h3>Data Protection</h3>
      <ul>
        <li>Encryption at rest and in transit</li>
        <li>Key management and rotation</li>
        <li>Backup and disaster recovery planning</li>
        <li>Data classification and handling procedures</li>
      </ul>
      
      <p>Security is an ongoing process, not a one-time setup. Regular security assessments, monitoring, and updates are essential for maintaining a strong security posture in the cloud.</p>
    `
  },
  {
    id: '4',
    title: 'Infrastructure as Code: Terraform vs CloudFormation',
    excerpt: 'Compare the leading Infrastructure as Code tools and learn when to use each for your cloud infrastructure automation needs.',
    author: 'Sarah Chen',
    date: 'Jan 8, 2025',
    readTime: '7 min read',
    category: 'Infrastructure',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: `
      <p>Infrastructure as Code (IaC) has revolutionized how we manage cloud resources. Instead of manual configuration through web consoles, IaC allows us to define infrastructure using code, bringing version control, testing, and automation to infrastructure management.</p>
      
      <h2>Why Infrastructure as Code?</h2>
      <p>IaC provides several key benefits over manual infrastructure management:</p>
      
      <ul>
        <li><strong>Consistency:</strong> Eliminate configuration drift and human errors</li>
        <li><strong>Version Control:</strong> Track changes and collaborate effectively</li>
        <li><strong>Automation:</strong> Integrate with CI/CD pipelines for automated deployments</li>
        <li><strong>Documentation:</strong> Code serves as living documentation of your infrastructure</li>
      </ul>
      
      <h2>Terraform: The Multi-Cloud Champion</h2>
      <p>Terraform's strength lies in its provider ecosystem and multi-cloud capabilities:</p>
      
      <ul>
        <li>Support for 100+ cloud providers and services</li>
        <li>Declarative syntax with HCL (HashiCorp Configuration Language)</li>
        <li>State management for tracking resource changes</li>
        <li>Modular design with reusable modules</li>
      </ul>
      
      <h2>CloudFormation: AWS Native Solution</h2>
      <p>AWS CloudFormation offers deep integration with AWS services:</p>
      
      <ul>
        <li>Native AWS service with no additional cost</li>
        <li>JSON or YAML template format</li>
        <li>Built-in rollback capabilities</li>
        <li>Stack-based resource management</li>
      </ul>
      
      <p>The choice between Terraform and CloudFormation often depends on your specific use case, team expertise, and multi-cloud requirements. Both tools are excellent choices for implementing Infrastructure as Code practices.</p>
    `
  }
];