"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Shield,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAdmin } from "@/context/AdminContext"
import api from "@/lib/api"

interface Article {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  status: "Draft" | "Published" | "Archived"
  views: number
  likes: number
  createdAt: string
  updatedAt: string
}

export default function ArticleManagementPage() {
  const { admin, loading: adminLoading, logout } = useAdmin()
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editArticle, setEditArticle] = useState<Article | null>(null)
  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "Draft" as "Draft" | "Published" | "Archived",
  })
  const { toast } = useToast()
  const router = useRouter()

  const categories = ["Diabetes", "Heart Health", "Nutrition", "Fitness", "Mental Health", "Genetics"]
  const statuses = ["Draft", "Published", "Archived"]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Diabetes":
        return "bg-purple-100 text-purple-800"
      case "Heart Health":
        return "bg-red-100 text-red-800"
      case "Nutrition":
        return "bg-green-100 text-green-800"
      case "Fitness":
        return "bg-blue-100 text-blue-800"
      case "Mental Health":
        return "bg-yellow-100 text-yellow-800"
      case "Genetics":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    if (!admin && !adminLoading) {
      router.push("/admin/login")
      return
    }

    const fetchArticles = async () => {
      try {
        const data = await api.get("/articles")
        setArticles(data.data)
      } catch (err: any) {
        toast({
          title: "Failed to fetch articles",
          description: err.message || "An error occurred while fetching articles.",
          variant: "destructive",
        })
      }
    }

    if (admin) fetchArticles()
  }, [admin, adminLoading, router, toast])

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, excerpt, category).",
        variant: "destructive",
      })
      return
    }

    try {
      const tagsArray = newArticle.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag)
      const created = await api.post("/articles", {
        ...newArticle,
        tags: tagsArray,
        author: admin?.name,
      })
      setArticles([created.data, ...articles])
      setNewArticle({ title: "", excerpt: "", content: "", category: "", tags: "", status: "Draft" })
      setIsCreateDialogOpen(false)
      toast({
        title: "Article Created",
        description: "New article has been created successfully.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create article",
        variant: "destructive",
      })
    }
  }

  const handleEditArticle = async () => {
    if (!editArticle) return
    if (!editArticle.title || !editArticle.excerpt || !editArticle.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, excerpt, category).",
        variant: "destructive",
      })
      return
    }

    try {
      const tagsArray = editArticle.tags.join(",").split(",").map((tag) => tag.trim()).filter((tag) => tag)
      const updated = await api.patch(`/articles/${editArticle._id}`, {
        ...editArticle,
        tags: tagsArray,
      })
      setArticles(articles.map((a) => (a._id === editArticle._id ? updated.data : a)))
      setIsEditDialogOpen(false)
      setEditArticle(null)
      toast({
        title: "Article Updated",
        description: "Article has been updated successfully.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update article",
        variant: "destructive",
      })
    }
  }

  const handleDeleteArticle = async (id: string) => {
    try {
      await api.delete(`/articles/${id}`)
      setArticles(articles.filter((a) => a._id !== id))
      toast({
        title: "Article Deleted",
        description: "Article has been removed successfully.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete article",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updated = await api.patch(`/articles/${id}`, { status })
      setArticles(articles.map((a) => (a._id === id ? updated.data : a)))
      toast({
        title: "Status Updated",
        description: `Article status changed to ${status}.`,
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "Published").length,
    drafts: articles.filter((a) => a.status === "Draft").length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === "all" || article.status === filterStatus
    const matchesCategory = filterCategory === "all" || article.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading admin data...</p>
      </div>
    )
  }

  if (!admin) {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header (Aligned with AdminDashboard) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Article Management</h1>
              <p className="text-slate-600">Manage health articles and educational content</p>
              <p className="text-sm text-slate-500">Welcome back, {admin.name || "Administrator"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Articles", value: stats.total, icon: FileText, bg: "bg-blue-100", color: "text-blue-600" },
            { title: "Published", value: stats.published, icon: Shield, bg: "bg-green-100", color: "text-green-600" },
            { title: "Drafts", value: stats.drafts, icon: Edit, bg: "bg-yellow-100", color: "text-yellow-600" },
            { title: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, bg: "bg-purple-100", color: "text-purple-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search articles, authors, or tags..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Article</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        placeholder="Enter article title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newArticle.category}
                        onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        value={newArticle.excerpt}
                        onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                        placeholder="Brief description of the article"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                        placeholder="Full article content"
                        rows={8}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={newArticle.tags}
                        onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
                        placeholder="Enter tags separated by commas"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newArticle.status}
                        onValueChange={(value) =>
                          setNewArticle({ ...newArticle, status: value as "Draft" | "Published" | "Archived" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateArticle}>Create Article</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Article Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Article</DialogTitle>
            </DialogHeader>
            {editArticle && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={editArticle.title}
                    onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
                    placeholder="Enter article title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category *</Label>
                  <Select
                    value={editArticle.category}
                    onValueChange={(value) => setEditArticle({ ...editArticle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-excerpt">Excerpt *</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={editArticle.excerpt}
                    onChange={(e) => setEditArticle({ ...editArticle, excerpt: e.target.value })}
                    placeholder="Brief description of the article"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editArticle.content}
                    onChange={(e) => setEditArticle({ ...editArticle, content: e.target.value })}
                    placeholder="Full article content"
                    rows={8}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tags">Tags</Label>
                  <Input
                    id="edit-tags"
                    value={editArticle.tags.join(", ")}
                    onChange={(e) => setEditArticle({ ...editArticle, tags: e.target.value.split(",").map((tag) => tag.trim()) })}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editArticle.status}
                    onValueChange={(value) =>
                      setEditArticle({ ...editArticle, status: value as "Draft" | "Published" | "Archived" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditArticle}>Update Article</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Articles List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                Articles ({filteredArticles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-slate-900 line-clamp-1">{article.title}</h3>
                        <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                        <Badge className={getStatusColor(article.status)}>{article.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select value={article.status} onValueChange={(value) => handleStatusChange(article._id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditArticle(article)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteArticle(article._id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Articles Found</h3>
                  <p className="text-slate-600">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}