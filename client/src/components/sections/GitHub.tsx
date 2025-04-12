import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export default function GitHub() {
  const username = "bimalendu04";

  const { data: userData, isLoading: userLoading, error: userError } = useQuery<GithubUser>({
    queryKey: [`https://api.github.com/users/${username}`],
  });

  const { data: reposData, isLoading: reposLoading, error: reposError } = useQuery<GithubRepo[]>({
    queryKey: [`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`],
  });

  // Function to get color for language
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      "C#": "#178600",
      PHP: "#4F5D95",
      Ruby: "#701516",
    };
    
    return colors[language] || "#8b949e";
  };

  return (
    <section id="github" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">GitHub Integration</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Check out my open-source contributions and personal projects on GitHub.
          </p>
        </div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {userLoading ? (
              <Skeleton className="w-32 h-32 rounded-full" />
            ) : userError ? (
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Error</span>
              </div>
            ) : userData ? (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                <img 
                  src={userData.avatar_url} 
                  alt={`${userData.name}'s GitHub Avatar`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : null}
            
            <div>
              {userLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              ) : userError ? (
                <div className="text-red-500">
                  Error loading GitHub profile. Please try again later.
                </div>
              ) : userData ? (
                <>
                  <h3 className="text-2xl font-bold mb-2">{userData.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">@{userData.login}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <i className="ri-git-repository-line mr-2"></i>
                      <span>{userData.public_repos} repositories</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <i className="ri-user-follow-line mr-2"></i>
                      <span>{userData.followers} followers</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <i className="ri-user-heart-line mr-2"></i>
                      <span>{userData.following} following</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={userData.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                    >
                      <span>View Profile</span>
                      <i className="ri-external-link-line ml-1"></i>
                    </a>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Popular Repositories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reposLoading ? (
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              ))
            ) : reposError ? (
              <div className="col-span-3 text-center text-red-500">
                Error loading GitHub repositories. Please try again later.
              </div>
            ) : reposData?.length ? (
              reposData.map((repo) => (
                <motion.div 
                  key={repo.id} 
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold mb-2">
                    <a 
                      href={repo.html_url}
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {repo.description || "No description provided"}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 justify-between">
                    {repo.language && (
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></span>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <i className="ri-star-line mr-1"></i>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <i className="ri-git-branch-line mr-1"></i>
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                No repositories found
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
